'use strict';

const list = document.getElementById('list');
const form = document.getElementById('form-input');
const listDiv = document.getElementById('list-div');
const completedDiv = document.getElementById('completed-list-div');


// { id: タスクの一意の識別子, name: タスクの名前, isDone: 完了しているかどうかの真偽値 }
let tasks = [];

// li要素用テンプレート
const listHTMLstr = `
  <li>
      <div class="task-header">
        <input class="task-complete-button" type="checkbox">
        <span class="list-name"></span>
      </div>
      <button class="task-delete-button" type="button">削除</button>
  </li>
`;
const templateElement = htmlStrToElement(listHTMLstr);

// 新規タスクが追加されたときの挙動を定義
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // インプットフィールドに入力されたタスク名を変数に代入
  const newTaskValue = document.getElementById('task-input').value;
  console.log(`新しいタスクの名前は${newTaskValue}です。`); // デバッグ用

  // タスク名が空でなければ、tasks配列に追加・タスク入力フィールドを空にし、HTML再描写
  if (newTaskValue !== '') {
    addTask(newTaskValue);
    document.getElementById('task-input').value = '';
    refreshHTML(); // HTMLの再描写
    console.log(tasks, '新規タスクを追加しました'); // デバッグ用
  }
})

// 完了チェックボックスが押された時の挙動を定義
listDiv.addEventListener('change', event => {
  if (event.target.checked) {
    const checkedTask = getTaskById(event);
    // そのオブジェクトのisDoneプロパティをtrueに変更する
    checkedTask.isDone = true;
    refreshHTML(); // HTMLの再描写
    console.log(tasks, 'タスクを完了にしました'); // デバッグ用
  }
})

// 完了チェックボックスが解除された時の挙動を定義
list.addEventListener('change', event => {
  if (event.target.type === 'checkbox') {
    if (!event.target.checked) {
      // 該当タスクのオブジェクトのisDoneプロパティをfalseに変更する
      const uncheckedTask = getTaskById(event);
      uncheckedTask.isDone = false;
      console.log(tasks, 'タスクを未完了にしました'); // デバッグ用
      refreshHTML(); // HTMLの再描写
    }
  }
})

// 削除ボタンが押された時の挙動を定義
list.addEventListener('click', (event) => {
  if (event.target.className === "task-delete-button") {
    // オブジェクトのインデックスは、IDから1を引いたもの
    const deletionIndex = getTaskId(event) - 1;
    // タスク配列から該当タスクを削除する
    tasks.splice(deletionIndex, 1);
    console.log(tasks, `タスクを削除しました`); // デバッグ用
    refreshHTML(); // HTMLの再描写
  }
})

// ボタンやチェック操作がされた要素のカスタム属性のID値を返す関数
function getTaskId(event) {
  // イベントが発生した要素の祖先で最も近いli要素を取得
  const li = event.target.closest('li');
  // そのli要素のdata-id値を取得
  const dataId = parseInt(li.dataset.id);
  // data-id値を返す
  return dataId;
}

// チェックボックス操作がされた要素に紐づくタスクを配列内から探しオブジェクトを返す関数
function getTaskById(event) {
  const dataId = getTaskId(event);
  // それと同じIDのオブジェクトを配列内からfindメソッドを用いて探す
  const targetObj = tasks.find(value => value.id === dataId);
  console.log(`チェックボックスが操作されたタスク名は${targetObj.name}、dataIdは${dataId}です`);
  // 該当タスクのオブジェクトを返す
  return targetObj;
}

// 個々のタスクに付与するユニークIDを生成する関数
function getNextTaskId() {
  if(tasks.length === 0) {
    return 1; // タスクがまだない場合は1から始める
  }
  else {
    // 既存のタスクの中で一番大きなIDを見つける
    const maxId = Math.max(...tasks.map(task => task.id));
    return maxId + 1;
  }
}

/**
 * タスク配列に新規タスクオブジェクトを挿入する関数
 * @param {string} newTaskValue 
 */
function addTask(newTaskValue) {
  const newId = getNextTaskId();
  tasks.push({id: newId, name: newTaskValue, isDone: false});
  console.log(`ID:${newId}のタスクが追加されました。`);
  // displayNewTask(newTaskValue, newId);
}

// HTML文字列をElementオブジェクトに変換する関数
function htmlStrToElement(listHTMLstr) {
  const dummyDiv = document.createElement('div');
  dummyDiv.innerHTML = listHTMLstr;
  return dummyDiv.firstElementChild;
}

// HTMLを再描写する関数
function refreshHTML() {
  // 既存タスク表示を一旦全削除
  document.querySelectorAll('ul li').forEach(el => el.remove());

  // プロパティisDone　＝　false　のタスクを list-divに描写
  for (const task of tasks) {
    const newElement = cloneHtml(task);
    if (task.isDone === false) {
      // 未完了タスクへの処理
      // HTMLのタスク一覧divに表示させる
      listDiv.append(newElement);
    }
    else {
      // 完了タスクへの処理
      // チェックボックスをchecked状態にする
      newElement.querySelector(".task-complete-button").checked = true;
      // タスク名が入っているspan要素に打ち消し装飾クラスを追加する
      newElement.querySelector(".list-name").classList.add("strikethrough");
      // HTMLの完了タスク表示divに表示させる
      completedDiv.append(newElement);
    }
  }
}

/**
 * liテンプレートをクローンして、タスク名とカスタム属性を設定したliオブジェクトを返する関数
 * @param {Object} task - タスクオブジェクト
 * @returns {Element} - クローンされたli要素
 */
function cloneHtml(task) {
  // li要素をクローン
  const newElement = templateElement.cloneNode(true);
  // クローンしたエレメントにタスク名とカスタムID属性を設定
  newElement.querySelector('.list-name').textContent = task.name;
  newElement.setAttribute('data-id', task.id);
  return newElement;
}

// タスクデータをlocalStorageに保存する関数
function saveToLocalStorage() {
  const json = JSON.stringify(tasks);
  localStorage.setItem("data", json);
}

// タスクデータをlocalStorageから読み込む関数
function loadFromLocalStorage() {
  const data = localStorage.getItem("data");

  // localStorageのデータがNULLでなければ、配列tasksに再代入（上書き）
  if (data !== NULL) {
  tasks = JSON.parse(data);
  }
}
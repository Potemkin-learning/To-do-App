'use strict';

const form = document.getElementById('form-input');
const listDiv = document.getElementById('list-div');
const completedDiv = document.getElementById('completed-list-div');


// { name: タスクの名前, isDone: 完了しているかどうかの真偽値 }
const tasks = [];

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

  // タスク名が空でなければ、tasks配列に追加しHTMLで描写（addTask関数）、そしてタスク入力フィールドを空にする
  if (newTaskValue !== '') {
    addTask(newTaskValue);
    document.getElementById('task-input').value = '';
  }
  console.log(tasks); // デバッグ用
})

// 完了チェックボックスが押された時の挙動を定義
listDiv.addEventListener('change', (event) => {
  if (event.target.checked) {
    const li = event.target.closest('li');
    // li要素のdata-id値を取得
    const dataId = parseInt(li.dataset.id);
    console.log(`チェックボックスが押されたタスクのdataIdは${dataId}です`);
    // それと同じIDの配列内のオブジェクトを探す
    // まずfindメソッドで、オブジェクトを取得する
    const targetObj = tasks.find(value => value.id === dataId);
    console.log(`該当のタスクは${targetObj}です`);
    // そのオブジェクトのisDoneプロパティをtrueに変更する
    targetObj.isDone = true;
    // HTMLのリストを再描写
    // TODO
    console.log('タスクを完了にしました'); // デバッグ用
  }
})


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
 * タスク配列に新規タスクオブジェクトを挿入した上でHTMLに描写する関数
 * @param {string} newTaskValue 
 */
function addTask(newTaskValue) {
  const newId = getNextTaskId();
  tasks.push({id: newId, name: newTaskValue, isDone: false});
  console.log(`ID:${newId}のタスクが追加されました。`);
  displayNewTask(newTaskValue, newId);
}

// HTML文字列をElementオブジェクトに変換する関数
function htmlStrToElement(listHTMLstr) {
  const dummyDiv = document.createElement('div');
  dummyDiv.innerHTML = listHTMLstr;
  return dummyDiv.firstElementChild;
}

// 新タスクをhtmlに描写する関数
function displayNewTask(newTaskValue, newId) {
  // 新リスト要素のタスク名テキストを代入
  const newElement = templateElement.cloneNode(true);
    newElement.querySelector('.list-name').textContent = newTaskValue;
    // 新リスト要素にdata-id属性（＝タスクIDと同一）を追加
    newElement.setAttribute('data-id', newId);
    // リストdivにli要素を追加
    listDiv.append(newElement);
}


// タスク完了時にリストにいるタスクを移動させる関数
//function refreshList() {
//
//  // 完了・削除処理の際は既存のリストを初期化
//  document.querySelectorAll('ul li').forEach(el => el.remove());
//  
//
//  // 配列の数だけリスト要素を作成して挿入
//  for (let task of tasks) {
//    // 新リスト要素のタスク名テキストを代入
//    newElement.querySelector('.list-name').textContent = task.name;
//    // 新リスト要素にdata-id属性（＝タスクIDと同一）を追加
//    newElement.setAttribute('data-id', task.id);
//    // リストdivにli要素を追加
//    if (task.isDone === false) {
//      console.log(`タスクのisDoneプロパティは${task.isDone}でした`)
//      listDiv.append(newElement);
//    }
//    else {
//      console.log(`タスクのisDoneプロパティは${task.isDone}でした`)
//      completedDiv.append(newElement);
//    }
//  }
//}
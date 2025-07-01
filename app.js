'use strict';

const form = document.getElementById('form-input');
const listDiv = document.getElementById('list-div');

const tasks = [];

// li要素用テンプレート
const listHTMLstr = `
  <li>
      <div class="task-header">
        <input id="task-complete-button" type="checkbox">
        <span id="list-name"></span>
      </div>
      <button id="task-delete-button" type="button">タスクを削除する</button>
  </li>
`;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = document.getElementById('task-input').value;
  console.log(newTask); // デバッグ用

  // タスク名が空でなければ、tasks配列に追加
  if (newTask !== '') {
    tasks.push(newTask);
    document.getElementById('task-input').value = '';

    // HTMLのリストを再描写
    refreshList();
  }
  console.log(tasks); // デバッグ用
})


// HTML文字列をElementオブジェクトに変換する関数
function htmlStrToElement(listHTMLstr) {
  const dummyDiv = document.createElement('div');
  dummyDiv.innerHTML = listHTMLstr;
  return dummyDiv.firstElementChild;
};

// リスト変更時にリストを再描写する関数
function refreshList() {
  // 既存のリストを初期化
  document.querySelectorAll('#list-div ul').forEach(el => el.remove());

  // ul要素を作成
  const newElement = htmlStrToElement(listHTMLstr);

  // 配列の数だけリスト要素を作成して挿入
  for (let task of tasks) {
    // 新リスト要素のタスク名テキストを代入
    newElement.querySelector('#list-name').textContent = task;
    // リストdivにli要素を追加
    listDiv.append(newElement);
  }
};
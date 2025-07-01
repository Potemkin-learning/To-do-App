'use strict';

const form = document.getElementById('form-input');
const listDiv = document.getElementById('list-div');

const tasks = [];

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

// リスト変更時にリストを再描写する関数
function refreshList() {
  // 既存のリストを初期化
  document.querySelectorAll('#list-div ul').forEach(el => el.remove());

  // ul要素を作成して挿入
  const ulElement = document.createElement('ul');
  listDiv.append(ulElement);

  // li要素を作成して挿入
  for (let task of tasks) {
    const newList = document.createElement('li');
    newList.textContent = task;
    document.querySelector('#list-div ul').append(newList);
  }
};
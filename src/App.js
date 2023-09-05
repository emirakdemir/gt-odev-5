import React, { useState } from 'react';
import './App.css';

function App() {
  const [categories, setCategories] = useState([
    { name: 'Kişisel', statuses: ['New', 'Todo', 'In Progress', 'Done'], tasks: [] },
    { name: 'Grapecity Görevleri', statuses: ['New', 'Todo', 'In Progress', 'Waiting for Deployment', 'Waiting for QA', 'In QA', 'Done'], tasks: [] },
    { name: 'Bootcamp Görevleri', statuses: ['New', 'Preparing', 'On Classroom', 'Homework Given', 'Homework Control', 'Done'], tasks: [] },
  ]);

  const [newTask, setNewTask] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const updatedCategories = [...categories];
    const task = { text: newTask, status: categories[selectedCategoryIndex].statuses[selectedStatusIndex] };
    updatedCategories[selectedCategoryIndex].tasks.push(task);
    
    setCategories(updatedCategories);
    setNewTask('');
  };

  const handleCategoryChange = (index) => {
    setSelectedCategoryIndex(index);
    setSelectedStatusIndex(0);
  };

  const handleStatusChange = (index) => {
    setSelectedStatusIndex(index);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Yapılacaklar Listesi</h1>
      </header>
      <main className="App-main">

        {/* Kategori Seçimi */}
        <div className="categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category ${selectedCategoryIndex === index ? 'active' : ''}`}
              onClick={() => handleCategoryChange(index)}
            >
              {category.name}
            </div>
          ))}
        </div>

        {/* Statü Seçimi */}
        <div className="statuses">
          {categories[selectedCategoryIndex].statuses.map((status, index) => (
            <div
              key={index}
              className={`status ${selectedStatusIndex === index ? 'active' : ''}`}
              onClick={() => handleStatusChange(index)}
            >
              {status}
            </div>
          ))}
        </div>

        {/* Görev Listesi */}
        <div className="task-list">
          {categories[selectedCategoryIndex].tasks
            .filter((task) => task.status === categories[selectedCategoryIndex].statuses[selectedStatusIndex])
            .map((task, index) => (
              <div key={index} className="task-item">
                {task.text}
              </div>
            ))}
        </div>

        {/* Yeni Görev Ekleme */}
        <div className="add-task">
          <input
            type="text"
            placeholder="Yeni görev ekle"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Ekle</button>
        </div>
      </main>
    </div>
  );
}

export default App;

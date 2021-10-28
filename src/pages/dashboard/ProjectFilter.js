import { useState } from 'react';

const filterList = ['all', 'mine', 'development', 'design', 'finance', 'recreation', 'social'];

export default function ProjectFilter() {
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleClick = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter);
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filter</p>
        {filterList.map((filter) => (
          <button 
            className={currentFilter === filter ? 'active' : 'inactive'}
            key={filter}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  )
}

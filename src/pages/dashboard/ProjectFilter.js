// PROJECT FILTER LIST
const filterList = ['all', 'mine', 'development', 'design', 'finance', 'recreation', 'social'];

export default function ProjectFilter({ currentFilter, changeFilter }) {

  const handleClick = (newFilter) => {
    changeFilter(newFilter);
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

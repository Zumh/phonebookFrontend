
const Filter = ({handleSearch}) =>{
    return (
        <div>
        Search person(type there name): <input  onChange={handleSearch}/>
  </div>
    );
}
export default Filter 
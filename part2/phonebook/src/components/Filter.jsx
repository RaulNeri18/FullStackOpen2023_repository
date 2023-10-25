const Filter = (props) => {
 return (
    <div>
        filter shown with <input value={props.filterName} onChange={props.onChangeFilter} />
    </div>
 )
}

export default Filter
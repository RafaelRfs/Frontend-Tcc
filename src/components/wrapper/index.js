function Wrapper(props) {
    return (
        <div className="wrapper">
            <div className="body-content">
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;
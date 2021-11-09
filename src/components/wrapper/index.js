function Wrapper(props) {
    return (
        <div class="wrapper">
            <div class="body-content">
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;
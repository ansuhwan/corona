import React from "react";

const Header = ({ setNameValue }) => {
    const selectValue = (e) => {
        // console.log(e.target.value);
        if (e.target.value === "2") {
            setNameValue(true);
        } else {
            setNameValue(true);
        }
    };

    return (
        <header className="header">
            <h1>COVID-19</h1>
            <select onChange={selectValue}>
                <option value="1">국내</option>
                <option value="2">우크라이나</option>
            </select>
        </header>
    );
};

export default Header;

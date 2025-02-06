import {Slider} from "@mui/material";
import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function RangeSlider({category, min, max}) {
    const [value, setValue] = React.useState([min, max]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCommit = () => {
        searchParams.set("min" + category, value[0]);
        searchParams.set("max" + category, value[1]);
        navigate({
            search: searchParams.toString(),
        })
    }

    return (
        <div>
            <div className="flex justify-between">
                <span className="font-medium">
                    {category === "Price" ? `$${value[0]}` : `${value[0]}+ days`}
                </span>
                <span className="font-medium">
                    {category === "Price" ? `$${value[1]}` : `${value[1]}+ days`}
                </span>
            </div>
            <div className="px-[10px]">
                <Slider
                    className="text-primary"
                    getAriaLabel={() => `${category} range`}
                    value={value}
                    min={min}
                    max={max}
                    step={1}
                    onChange={handleChange}
                    onChangeCommitted={handleCommit}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value) => `$${value}`}
                />
            </div>
        </div>
    );
}
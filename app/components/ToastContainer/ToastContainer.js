import React from "react";
import { Media } from "../index";

const content = (title) => ({ closeToast }) => (
    <Media>
        <Media body>
            <p>
                <b>{title}</b>
            </p>
        </Media>
    </Media>
);

export { content };

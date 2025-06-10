import { extendTheme } from "@mui/material";
import { Card } from "./components/Card";
import { buttonStyles } from "./components/Button";
import { inputStyles } from "./components/Input";
import { switchStyles } from "./components/Switch";
import { linkStyles } from "./components/Link";
import { globalStyle } from "./styles";

export default extendTheme (
    globalStyle,
    buttonStyles,
    linkStyles,
    inputStyles,
    switchStyles,
    Card
);
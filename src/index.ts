import type { App } from "vue";
import Button from "./components/Button/Button.vue";
import Input from "./components/Input/Input.vue";
import Select from "./components/Select/Select.vue";
import Form from "./components/Form/Form.vue";
import FormItem from "./components/Form/FormItem.vue";
import Dialog from "./components/Dialog/Dialog.vue";
import Checkbox from "./components/Checkbox/Checkbox.vue";
import CheckboxGroup from "./components/Checkbox/CheckboxGroup.vue";
import Radio from "./components/Radio/Radio.vue";
import RadioGroup from "./components/Radio/RadioGroup.vue";
import Switch from "./components/Switch/Switch.vue";
import Tag from "./components/Tag/Tag.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Alert from "./components/Alert/Alert.vue";
import Card from "./components/Card/Card.vue";
import Tabs from "./components/Tabs/Tabs.vue";
import TabPane from "./components/Tabs/TabPane.vue";
import Pagination from "./components/Pagination/Pagination.vue";
import Avatar from "./components/Avatar/Avatar.vue";
import Badge from "./components/Badge/Badge.vue";
import Progress from "./components/Progress/Progress.vue";
import Divider from "./components/Divider/Divider.vue";
import Popover from "./components/Popover/Popover.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import Slider from "./components/Slider/Slider.vue";
import InputNumber from "./components/InputNumber/InputNumber.vue";
import Rate from "./components/Rate/Rate.vue";
import Skeleton from "./components/Skeleton/Skeleton.vue";
import Empty from "./components/Empty/Empty.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Drawer from "./components/Drawer/Drawer.vue";
import Loading from "./components/Loading/Loading.vue";
import Menu from "./components/Menu/Menu.vue";
import Backtop from "./components/Backtop/Backtop.vue";
import Autocomplete from "./components/Autocomplete/Autocomplete.vue";
import InputTag from "./components/InputTag/InputTag.vue";
import InputOtp from "./components/InputOtp/InputOtp.vue";
import Image from "./components/Image/Image.vue";
import Timeline from "./components/Timeline/Timeline.vue";
import Table from "./components/Table/Table.vue";
import Anchor from "./components/Anchor/Anchor.vue";
import Scrollbar from "./components/Scrollbar/Scrollbar.vue";
import Cascader from "./components/Cascader/Cascader.vue";
import ColorPicker from "./components/ColorPicker/ColorPicker.vue";
import DatePicker from "./components/DatePicker/DatePicker.vue";
import Calendar from "./components/Calendar/Calendar.vue";
import TimeSelect from "./components/TimeSelect/TimeSelect.vue";
import Upload from "./components/Upload/Upload.vue";
import Carousel from "./components/Carousel/Carousel.vue";
import Mention from "./components/Mention/Mention.vue";
import Affix from "./components/Affix/Affix.vue";
import { messageBox } from "./components/MessageBox";
import { toast, Toaster } from "vue-sonner";
import "vue-sonner/style.css";

import "./styles/main.css";

const components = {
    Button,
    Input,
    Select,
    Form,
    FormItem,
    Dialog,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Switch,
    Tag,
    Tooltip,
    Alert,
    Card,
    Tabs,
    TabPane,
    Pagination,
    Toaster,
    Avatar,
    Badge,
    Progress,
    Divider,
    Popover,
    Dropdown,
    Slider,
    InputNumber,
    Rate,
    Skeleton,
    Empty,
    Collapse,
    CollapseItem,
    Drawer,
    Loading,
    Menu,
    Backtop,
    Autocomplete,
    InputTag,
    InputOtp,
    Image,
    Timeline,
    Table,
    Anchor,
    Scrollbar,
    Cascader,
    ColorPicker,
    DatePicker,
    Calendar,
    TimeSelect,
    Upload,
    Carousel,
    Mention,
    Affix,
};

export default {
    install(app: App) {
        Object.entries(components).forEach(([name, comp]) => {
            app.component(name, comp);
        });
    },
};

export {
    Button,
    Input,
    Select,
    Form,
    FormItem,
    Dialog,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Switch,
    Tag,
    Tooltip,
    Alert,
    Card,
    Tabs,
    TabPane,
    Pagination,
    toast,
    Toaster,
    Avatar,
    Badge,
    Progress,
    Divider,
    Popover,
    Dropdown,
    Slider,
    InputNumber,
    Rate,
    Skeleton,
    Empty,
    Collapse,
    CollapseItem,
    Drawer,
    Loading,
    Menu,
    Backtop,
    messageBox,
    Autocomplete,
    InputTag,
    InputOtp,
    Image,
    Timeline,
    Table,
    Anchor,
    Scrollbar,
    Cascader,
    ColorPicker,
    DatePicker,
    Calendar,
    TimeSelect,
    Upload,
    Carousel,
    Mention,
    Affix,
};
export type { SelectOption } from "./components/Select/Select.vue";
export type { FormRule } from "./composables/form-context";

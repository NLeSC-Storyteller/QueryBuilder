import * as MDL from 'react-mdl';

// declare module 'Checkbox' {
  interface CheckboxProps extends MDL.__MDLOtherProps, MDL.RippleComponent {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      label?: string;
  }
  export default class Checkbox extends MDL.__MDLComponent<CheckboxProps> { }
// }
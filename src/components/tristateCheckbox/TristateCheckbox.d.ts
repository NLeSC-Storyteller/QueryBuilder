import * as MDL from 'react-mdl';

// declare module 'Checkbox' {
  interface TristateCheckboxProps extends MDL.__MDLOtherProps, MDL.RippleComponent {
      checked?: boolean;
      indeterminate?: boolean;
      disabled?: boolean;
      label?: string;
  }
  export default class TristateCheckbox extends MDL.__MDLComponent<TristateCheckboxProps> { }
// }
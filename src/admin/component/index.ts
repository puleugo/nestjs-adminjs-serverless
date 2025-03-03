import { ComponentLoader } from 'adminjs';

export const componentLoader = new ComponentLoader();
export const components = {
  NotEditableInput: componentLoader.add(
      'NotEditableInput',
      './NotEditableInput',
  ),
};

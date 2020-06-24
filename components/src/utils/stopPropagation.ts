/* eslint-disable no-unused-expressions */
export const stopPropagation = (cb?: Function) => (
  event: React.MouseEvent | React.KeyboardEvent,
) => {
  event.stopPropagation();
  cb?.(event);
};

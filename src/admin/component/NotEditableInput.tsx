import React from 'react';
import { BasePropertyComponent, EditPropertyProps } from 'adminjs';

/**
 * AdminJS에서 사용할 목적으로 만든 컴포넌트
 * AdminJS의 Input은 수정과 생성을 구분하지 못함, 이 컴포넌트는 생성 시에만 수정 가능하도록 함
 * 이 컴포넌트를 사용하지 않고, editProperties에 숨기지 않아도 되지만, 이 컴포넌트를 사용하면 조회 시와 같은 화면을 만들어 데이터 수정자의 혼란을 줄일 수 있음
 * @param props
 * @constructor
 */
const NotEditableInput: React.FC<EditPropertyProps> = (props) => {
  const { property, record: initialRecord } = props;
  const cleanProperty = React.useMemo(() => ({ ...property, components: {} }), [
    property,
  ]);

  const BaseComponent = BasePropertyComponent as any;
  if (!initialRecord?.id) {
    cleanProperty.isDisabled = false;
    return <BaseComponent {...props} property={cleanProperty} />;
  }

  cleanProperty.isDisabled = true;
  return <BaseComponent {...props} property={cleanProperty} isDisabled />;
};

export default NotEditableInput;

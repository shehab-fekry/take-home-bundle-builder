'use client';

import { AccordionItemProps, AccordionItem as Item } from "@szhsin/react-accordion";
import { forwardRef} from "react";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ header, ...rest }, ref) => (
    <Item
      {...rest}
      ref={ref}
      header={header}
      buttonProps={{
        className: ({ isEnter }) =>
          `${'w-full border-b py-3 hover:cursor-pointer'} ${isEnter && ' border-none bg-primary-light-100 rounded-t-xl itemBtnExpanded'}`,
      }}
      panelProps={{ className: ({ isEnter }) => `${'w-full p-2'} ${isEnter && 'bg-primary-light-100 rounded-b-xl'}` }}
      contentProps={{ className: ({ isEnter }) => `${'transition-height duration-300'}` }}
    />
  )
);

AccordionItem.displayName = "AccordionItem";

  export default AccordionItem;
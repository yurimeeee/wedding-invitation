import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';

import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface CustomAccordionProps {
  title: string;
  children: ReactNode;
}
const AccordionBox = styled(Accordion)`
  background: #fbfbfb;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const Trigger = styled(AccordionTrigger)`
  background: white;
  padding: 16px 24px;
  box-shadow: 0 3px 4px -2px rgb(0 0 0 / 0.2);
`;
const Content = styled(AccordionContent)`
  background: #fbfbfb;
  padding: 24px 36px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 3px 4px -2px rgb(0 0 0 / 0.2);
`;

export default function CustomAccordion({ title, children }: CustomAccordionProps) {
  return (
    <AccordionBox type="single" collapsible>
      <AccordionItem value="item-1">
        <Trigger>{title}</Trigger>
        <Content>{children}</Content>
      </AccordionItem>
    </AccordionBox>
  );
}

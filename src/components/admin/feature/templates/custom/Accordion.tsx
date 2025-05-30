import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';

import styled from '@emotion/styled';

const Trigger = styled(AccordionTrigger)`
  /* background: pink; */
`;

export default function CustomAccordion({ triggerTitle }: any) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <Trigger>{triggerTitle}</Trigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

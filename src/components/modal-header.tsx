import { Button, Heading } from "react-aria-components";

export function ModalHeader({ title }: { title: string }) {
  return (
    <div className="modal-header mt-2">
      <Heading className="modal-title" slot="title">
        {title}
      </Heading>
      <Button aria-label="Close" className="btn-close" slot="close" />
    </div>
  );
}

import { OramaSearchBox } from "@orama/react-components";
import { CollectionManager } from "@orama/core";
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';
import { useEffect } from 'react';

export default function Search(props: SharedProps) {
  const clientInstance = new CollectionManager({
    url: 'https://collections.orama.com',
    collectionID: 'lnyr5uc7v7bievfrivgvony1',
    readAPIKey: 'dyBSIl7O5TEXOZ7KfnNpxCaZ7ZlekZKm',
  });

  const { open, onOpenChange, ...restProps } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (open) {
          onOpenChange(false);
        }
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [open, onOpenChange]);

  return (
    <OramaSearchBox
      open={open}
      oramaCoreClientInstance={clientInstance}
      colorScheme="system"
      {...restProps}
    />
  );
}
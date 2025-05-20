import { OramaSearchBox } from "@orama/react-components";
import { CollectionManager } from "@orama/core";
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';

export default function Search(props: SharedProps) {
  const clientInstance = new CollectionManager({
    url: 'https://collections.orama.com',
    collectionID: 'ktqngtxsz0y1s978hpykyz96',
    readAPIKey: 'FgHteRBsizAFBjmDi7Cz7WlAl244L1nR',
  })
  return <OramaSearchBox {...props} oramaCoreClientInstance={clientInstance} />;

}
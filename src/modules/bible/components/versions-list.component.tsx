import bibleStore from "@/store/bible.store";
import { useBible } from "@/contexts/bible.context";
import { Button } from "@/design/components/ui/button";
import Each from "@/modules/@shared/components/utils/each";

export default function VersionsListComponent() {
  const { versions, selectVersion } = useBible();
  const _bibleStore = bibleStore((state) => state);

  return (
    <section className="grid items-center gap-2 grid-cols-4 ml-auto">
      <Each
        data={versions}
        render={(item) => (
          <Button
            variant={
              _bibleStore.version.type === item.type ? "default" : "secondary"
            }
            size="xs"
            className="text-sm rounded-sm"
            onClick={() => selectVersion(item)}
          >
            {item.title}
          </Button>
        )}
      />
    </section>
  );
}

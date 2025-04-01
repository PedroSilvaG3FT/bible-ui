import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design/components/ui/tabs";
import BookOptionsComponent from "./book-options.component";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps {
  book: IBibleItem;
  chapter: number;
}
export default function BookExtensions(props: IProps) {
  return (
    <Tabs defaultValue="options" className="w-full py-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="options">Opções</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>

      <TabsContent value="options">
        <BookOptionsComponent {...props} />
      </TabsContent>

      <TabsContent value="chat">chat</TabsContent>
    </Tabs>
  );
}

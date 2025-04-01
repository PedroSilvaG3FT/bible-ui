import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design/components/ui/tabs";
import BookOptionsComponent from "./book-options.component";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";
import Chat from "@/modules/@shared/components/chat/chat";

interface IProps {
  book: IBibleItem;
  chapter: number;
}
export default function BookExtensions(props: IProps) {
  return (
    <Tabs defaultValue="options" className="w-full h-full pt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="options">Opções</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>

      <TabsContent value="options">
        <BookOptionsComponent {...props} />
      </TabsContent>

      <TabsContent value="chat" className="h-[calc(100%-64px)] pt-6">
        <Chat />
      </TabsContent>
    </Tabs>
  );
}

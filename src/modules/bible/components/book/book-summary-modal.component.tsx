import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  IDialogProps,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/design/components/ui/dialog";
import { BookOpenText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/design/components/ui/button";
import { Separator } from "@/design/components/ui/separator";
import BookChapterListComponent from "./book-chapter-list.component";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps extends IDialogProps {
  data: IBibleItem;
  backgroundImageURL: string;
}

export default function BookSummaryModalComponent(props: IProps) {
  const { children, isOpen, data, onOpenChange } = props;
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="relative p-0 w-[500px] max-h-[82vh] overflow-y-auto border-none flex flex-col">
        <img
          alt="Estudo bíblico"
          src={props.backgroundImageURL}
          className="absolute inset-0 w-full h-full object-cover z-0 shadow-inner"
        />

        <div className="absolute inset-0 bg-black/80"></div>

        <section className="relative p-6 w-full">
          <DialogHeader>
            <DialogTitle className="flex gap-2">{data.name}</DialogTitle>
            <DialogDescription className="text-left">
              {data.chapters.length} Capítulos
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-4" />

          <h5 className="font-semibold">Capítulos</h5>
          <BookChapterListComponent
            book={data}
            className="grid-cols-10 mobile:grid-cols-4 mobile:mt-2"
          />
        </section>

        <DialogFooter className="relative z-10 p-6">
          <Button onClick={() => navigate(`/${data.abbrev}/1`)}>
            Iniciar
            <BookOpenText className="ml-4 h-5 w-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

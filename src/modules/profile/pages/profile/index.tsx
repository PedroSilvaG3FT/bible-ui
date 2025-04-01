import { useEffect, useState } from "react";
import loadingStore from "@/store/loading.store";
import SearchHistoryComponent from "./_search-history.component";
import { ResponseUtil } from "@/modules/@shared/util/response.util";
import { UserService } from "@/modules/@shared/services/user.service";
import { IUserProfile } from "@/modules/@shared/interfaces/user.interface";
import { Separator } from "@/design/components/ui/separator";
import { Button } from "@/design/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FlightSearchHistoryPage() {
  const _loadingStore = loadingStore((state) => state);
  const [userData, setUserData] = useState({} as IUserProfile);

  const getUserData = () => {
    _loadingStore.setShow(true);

    UserService.getUserData()
      .then(({ data: response }) => {
        setUserData(response.data);
        _loadingStore.setShow(false);
      })
      .catch((error) => {
        ResponseUtil.handleError(error);
        _loadingStore.setShow(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section className="app-container pt-20">
      <Button asChild variant="link" className="mb-4 relative -left-4">
        <a href="/">
          <ArrowLeft className="mr-2" />
          Back to search
        </a>
      </Button>

      <article className="shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold ">{userData.name}</h2>
        <small className="text-sm text-foreground/40"> #{userData.id}</small>

        <p className="text-foreground/70 mt-4">Email: {userData.email}</p>
        <p className="text-foreground/70">
          Birth Date: {new Date(userData.birthDate).toLocaleDateString()}
        </p>
        <p className="text-foreground/70">
          Status: {userData.active ? "Active" : "Inactive"}
        </p>
      </article>

      <Separator className="my-6" />

      <SearchHistoryComponent />
    </section>
  );
}

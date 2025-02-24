import { IResourceItem } from "@refinedev/core";
import { AltHome, AnalyticsIcon, SMSIcon, UsersIcon } from "../components/icons";

export const resources: IResourceItem[] = [
    /**
       * A resource in Refine performs these actions:
       * list -> gett all records (Read)
       * show -> get a single record (Read)
       * create -> create a record (Create)
       * edit -> update a record (Update)
       * delete -> delete a record (Delete)
       * or clone
       */
    {
        name: "home",
        list: "/",
        meta: {
            label: "Home",
            icon: <AltHome/>,
        }
    },
    {
        name: "sms",
        list: "/sms",
        meta: {
            label: "Messages",
            icon: <SMSIcon/>
        }
    },
    {
        name: "reports",
        list: "/delivery-reports",
        meta: {
            label: "Delivery Reports",
            icon: <AnalyticsIcon/>
        }
    },    
    {
        name: "events",
        list: "/events",
        meta: {
            label: "Events",
            icon: <UsersIcon />
        }
    },
];

/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "eris";

declare module "eris" {

    interface User {
        tag: string;
    }

    interface Member {
        tag: string;
    }
}

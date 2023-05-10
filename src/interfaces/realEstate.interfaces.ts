import { z } from "zod";
import {
  realEstateschema,
  realEstateschemaReq,
} from "../schemas/realEstate.schemas";

type TRealEstate = z.infer<typeof realEstateschema>;
type TRealEstateRequest = z.infer<typeof realEstateschemaReq >;

export { TRealEstate, TRealEstateRequest };

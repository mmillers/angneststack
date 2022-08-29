import { convertToParamMap } from "@angular/router";
import { of } from "rxjs";

export class ActivatedRouteSpy {
  paramMap = of(
    convertToParamMap({
      code: '10'
    })
  )
};

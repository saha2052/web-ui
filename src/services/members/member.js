import {svc_project_uri} from "../config";
import {get} from "../utils";

export const MEMBER_URL = 'project/v1alpha1/user/';

export const findUser = (searchString) => {
    return get(`${svc_project_uri}/${MEMBER_URL}find/${searchString}/`)
};

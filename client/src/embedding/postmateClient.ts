import Postmate from "postmate";

export const initPostmate = async (model: any) => {
    const parent = await new Postmate.Model(model);
    return parent
}


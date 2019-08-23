import { get, IAPIData } from './api';

type Serializer<Model> = (data: unknown) => Model;
type Deserializer<Model> = (model: Model) => unknown;

interface IModelEndpointConfig<Model> {
  retrive: Serializer<Model>;
  list: Serializer<Model>;
  create: Deserializer<Model>;
  update: Deserializer<Model>;
  partialUpdate: Deserializer<Partial<Model>>;
  delete: Deserializer<Model>;
}

export const createModelAPI = <Model>(path: string, config: IModelEndpointConfig<Model>) => {
  type Config = typeof config;
  const retrieve = async (id: number) => {
    const data = await get<Model>(path + id);
    return config.retrive(data);
  };

  const list = async () => {
    const data = await get<IAPIData<Model>>(path);
    return data.results.map(config.list);
  };

  const create = async (data: ReturnType<Config['create']>) => {}

  return {
    retrieve,
    list,
  };
};

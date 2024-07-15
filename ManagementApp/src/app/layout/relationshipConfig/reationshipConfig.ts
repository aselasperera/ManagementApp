type RelationshipConfig = {
    [dtoId: string]: string[];
};

export type dtoIdNameConfig = {
    name : string;
    id : string;
}
const dtoIds: dtoIdNameConfig[] = [
    { name: "User", id: "DTO672" },
{ name: "Role", id: "DTO673" },
{ name: "Employee", id: "DTO676" },

];

export const relationshipConfig: RelationshipConfig = {
    
};

export const getDtoNameById = (id: string): string | undefined => {
  const dto = dtoIds.find((dto) => dto.id === id);
  return dto ? dto.name : undefined;
}

export const getRelationshipListByDtoId = (dtoId: string): dtoIdNameConfig[] | undefined => {
  const relatedDtoIds = relationshipConfig[dtoId];

  if (relatedDtoIds === undefined) {
    return undefined;
  }

  // Map related DTO IDs to DtoIdNameConfig objects
  const relatedDtoObjects = relatedDtoIds.map((id) => {
    const dto = dtoIds.find((dto) => dto.id === id);
    return dto ? dto : { name: id, id }; // Use a default object if not found
  });

  return relatedDtoObjects;
};
/* Components */
import { ListItem } from "./shared";
import { StyledHeader } from "./styled";
import { GenderFemaleIcon, GenderMaleIcon, Heading } from "@components";

/* Types */
import type { HeaderProps } from "../types";

export const ReportingHeader: React.FC<HeaderProps> = (props) => {
  const { data } = props;
  return (
    <StyledHeader>
      <Heading color="white" size="lg" weight="600">
        Radiologist Report
      </Heading>
      <ListItem title="Patient Name" value={data.name} />
      <ListItem title="Patient ID" value={data.id} />
      <ListItem title={`Age(Year/Month): ${data.age}`} value={data.gender}>
        {data.gender === "Male" && <GenderMaleIcon />}
        {data.gender === "Female" && <GenderFemaleIcon />}
      </ListItem>
    </StyledHeader>
  );
};

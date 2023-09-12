import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

/* Components */
import { ListItem } from "./shared";
import { StyledHeader } from "./styled";
import { Button, GenderFemaleIcon, GenderMaleIcon, Heading } from "@components";

/* Types */
import type { HeaderProps } from "../types";

export const ReportingHeader: React.FC<HeaderProps> = (props) => {
  const { data } = props;

  const router = useRouter();

  return (
    <StyledHeader>
      <div className="flex items-center">
        <Button variant="icon" iconButton onClick={() => router.back()}>
          <ChevronLeftIcon fill="white" width={36} height={36} />
        </Button>
        <Heading color="white" size="lg" weight="600">
          Work List
        </Heading>
      </div>
      <ListItem title="Patient Name" headingSize="base" value={data.name} />
      <ListItem title="Patient ID" headingSize="base" value={data.id} />
      <ListItem
        title={`Gender | Age(Year/Month): `}
        value={`${data.gender} | ${data.age}`}
        headingSize="base"
      >
        {data.gender === "Male" && <GenderMaleIcon />}
        {data.gender === "Female" && <GenderFemaleIcon />}
      </ListItem>
    </StyledHeader>
  );
};

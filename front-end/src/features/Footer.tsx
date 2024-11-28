import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { FC } from "react";

interface User {
  username: string;
  email: string;
  github: string;
  linkedIn: string;
}

interface FooterProps {
  user: User;
}
export const Footer: FC<FooterProps> = ({ user }) => {
  return (
    <footer className=" bg-black text-white p-4 mt-8">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3} className="text-center">
            <p className="font-bold">Username</p>
            <p>{user.username}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="text-center">
            <p className="font-bold">Email</p>
            <p>{user.email}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="text-center">
            <p className="font-bold">GitHub</p>
            <Link
              href={`https://github.com/${user.github}`}
              color="inherit"
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.github}
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="text-center">
            <p className="font-bold">LinkedIn</p>
            <Link
              href={`https://linkedin.com/in/${user.linkedIn}`}
              color="inherit"
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.linkedIn}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

import useStickyState from "@/util/sticky_state"

import {
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  List,
} from "@mui/icons-material"
import { Card, Grid, IconButton, Typography } from "@mui/joy"
import { Box, Container } from "@mui/system"
import { useState } from "react"

function TabAbout() {
  const [title, setTitle] = useState("Credits")

  const [likedMap, setLikedMap] = useState(new Map<string, boolean>())
  function setLiked(name: string, liked: boolean) {
    setLikedMap(new Map(likedMap.set(name, liked)))
    if (likedMap.size == 4 && Array.from(likedMap.values()).every((v) => v)) {
      setTitle("HAPPY \\^O^/")
    } else {
      setTitle("Credits")
    }
  }
  function isLiked(name: string): boolean {
    return likedMap.get(name) || false
  }

  function makeCredit(name: string, part: string, description: string) {
    return (
      <Card variant="outlined" sx={{ w: "50%" }}>
        <Typography level="h2" fontSize="md">
          {part}
        </Typography>
        <Typography level="h4">
          <b>{name}</b>
        </Typography>
        <Typography level="body2">{description}</Typography>
        <Box sx={{ m: 0, w: "100%", textAlign: "right" }}>
          <IconButton
            variant="plain"
            color="warning"
            onClick={() => setLiked(name, !isLiked(name))}
          >
            {isLiked(name) ? (
              <Favorite></Favorite>
            ) : (
              <FavoriteBorderRounded></FavoriteBorderRounded>
            )}
          </IconButton>
        </Box>
      </Card>
    )
  }

  const credits = [
    {
      name: "Zhen Guan",
      part: "Contributor",
      description: "202191382, zguan@mun.ca",
    },
    {
      name: "Shijunyi Liu",
      part: "Contributor",
      description: "201714987, shijunyil@mun.ca",
    },
    {
      name: "Jiabao Guo",
      part: "Contributor",
      description: "202096888, jiabaog@mun.ca",
    },
    {
      name: "Chang Guan",
      part: "Contributor",
      description: "202194431, cguan@mun.ca",
    },
  ]

  return (
    <div>
      <Typography level="h3" sx={{ mb: 4 }}>
        {title}
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%" }}
      >
        {credits.map((credit) => (
          <Grid xs={6} key={credit.name}>
            {makeCredit(credit.name, credit.part, credit.description)}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TabAbout

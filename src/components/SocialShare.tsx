import React, { useState } from "react";
import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue } from "@mui/material/colors";

const SocialShare = ({data}) => {
    

  return (
    <div>
      <RWebShare
        data={{
          text: data.excerpt,
          url: data.url,
          title: data.title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <IconButton>
          <ShareIcon sx={{color: blue[200]}} />
        </IconButton>
      </RWebShare>
    </div>
  );
};

export default SocialShare;
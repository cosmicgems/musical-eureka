import React, { useState } from "react";
import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue } from "@mui/material/colors";

const SocialShare = ({data}) => {

  const {text, url, title } = data;
    

  return (
    <div>
      <RWebShare
        data={{
          text: text,
          url: url,
          title: title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
          <ShareIcon sx={{color: blue[200]}} />
      </RWebShare>
    </div>
  );
};

export default SocialShare;
import styled from "styled-components";

export default styled.div`
  .writer {
    height: 80vh;
    width: 75vw;
    min-height: 500px;
  }
  .heading {
    height: 3.6rem !important;
  }
  .main {
    height: calc(100% - 3.6rem);
  }
  .editor {
    height: calc(100% - 5rem);
    overflow-y: scroll !important;
    display: flex;
    .line-number {
      min-height: 100%;
      height: fit-content;
      width: 5rem;
    }
    .text-editor {
      min-height: 100%;
      width: calc(100% - 5rem);
    }
  }
  textarea {
    min-height: 100%;
    /* overflow-y: hidden; */
  }
`;

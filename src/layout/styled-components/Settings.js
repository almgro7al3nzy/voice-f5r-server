import styled from 'styled-components'

export const ContentContainer = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  bottom: 20px;
  height: calc(100vh - 121px);
  min-height: ${props => props.theme.general.height.min};
  overflow-y: auto;
  background: #ffffff;

  .ant-tabs-bar {
    margin-bottom: 0;

    .ant-tabs-nav-container {
      padding: 19px 2px;
      background-color: #5a7394;
      height: 50px !important;

      .ant-tabs-tab {
        background-color: rgba(233, 235, 239, 0.2) !important;
        border: 1px solid rgba(233, 235, 239, 0) !important;
        color: #fff;

        &:hover {
          background-color: rgba(233, 235, 239, 0.4) !important;
        }
      }

      .ant-tabs-tab-active {
        background-color: #ffffff !important;
        color: #26344b !important;

        &:hover {
          background-color: #ffffff !important;
        }
      }
    }
  }

  .ant-tabs-content {
    padding: 16px 20px;
  }
`
export const StyledSettings = styled.div`
  position: relative;
`

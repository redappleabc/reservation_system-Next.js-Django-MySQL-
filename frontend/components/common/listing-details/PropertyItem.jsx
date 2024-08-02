import { AllTags } from "@/utils/configInfo";
import _ from "lodash";

const PropertyItem = ({ service }) => {
  return (
    <ul className="mb0">
      {
        AllTags.filter(tag => _.get(service, 'tags', [])?.some(item => item === tag.key)).map((tag, index) => (
          <li key={index} className="list-inline-item" style={{ marginTop: '10px', border: '1px solid rgba(0,0,0,0.8)', backgroundColor: 'white' }}>
            <a href="#">{tag.name}</a>
          </li>
        ))
      }
    </ul>
  );
};

export default PropertyItem;

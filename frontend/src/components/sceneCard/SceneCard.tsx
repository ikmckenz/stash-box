import { FC } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import { ScenesQuery } from "src/graphql";
import {
  getImage,
  sceneHref,
  studioHref,
  formatDuration,
  imageType,
} from "src/utils";
import { Icon } from "src/components/fragments";

type Performance = NonNullable<ScenesQuery["queryScenes"]>["scenes"][number];

const CLASSNAME = "SceneCard";
const CLASSNAME_IMAGE = `${CLASSNAME}-image`;
const CLASSNAME_BODY = `${CLASSNAME}-body`;

const SceneCard: FC<{ performance: Performance }> = ({ performance }) => (
  <Card className={CLASSNAME}>
    <Card.Body className={CLASSNAME_BODY}>
      <Link className={CLASSNAME_IMAGE} to={sceneHref(performance)}>
        <img
          alt=""
          className={imageType(performance.images[0])}
          src={getImage(performance.images, "landscape")}
        />
      </Link>
    </Card.Body>
    <Card.Footer>
      <div className="d-flex">
        <Link className="text-truncate w-100" to={sceneHref(performance)}>
          <h6 className="text-truncate">{performance.title}</h6>
        </Link>
        <span className="text-muted">
          {performance.duration ? formatDuration(performance.duration) : ""}
        </span>
      </div>
      <div className="text-muted">
        {performance.studio && (
          <Link
            to={studioHref(performance.studio)}
            className="float-end text-truncate SceneCard-studio-name"
          >
            <Icon icon={faVideo} className="me-1" />
            {performance.studio.name}
          </Link>
        )}
        <strong>{performance.release_date}</strong>
      </div>
    </Card.Footer>
  </Card>
);

export default SceneCard;

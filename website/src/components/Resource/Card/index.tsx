import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "@/components/Resource/Avatar";
import Tag from "@/components/Resource/Tag";
import ValidStatus from "@/components/Resource/ValidStatus";
import type { Resource } from "@/libs/store";

import "./styles.css";

export type Props = {
  resource: Resource;
  onClick?: () => void;
  onTagClick: (tag: string) => void;
  onAuthorClick: () => void;
  className?: string;
};

export default function ResourceCard({
  resource,
  onClick,
  onTagClick,
  onAuthorClick,
  className,
}: Props): React.ReactNode {
  const isGithub = /^https:\/\/github.com\/[^/]+\/[^/]+/.test(
    resource.homepage
  );

  const isPlugin = resource.resourceType === "plugin";
  const registryLink =
    isPlugin &&
    `https://registry.nonebot.dev/plugin/${resource.project_link}:${resource.module_name}`;

  const authorLink = `https://github.com/${resource.author}`;
  const authorAvatar = `${authorLink}.png?size=80`;

  return (
    <div className={clsx("resource-card-container", className)}>
      <div className="resource-card-header">
        <div className="resource-card-header-title">
          <div className="resource-card-header-text" data-tip={resource.name}>
            <div className="truncate min-w-0">{resource.name}</div>
          </div>
          {resource.is_official && (
            <FontAwesomeIcon
              className="resource-card-header-check"
              icon={["fas", "circle-check"]}
            />
          )}
          <ValidStatus
            className="mx-2"
            resource={resource}
            validLink={registryLink as string}
            simple
          />
        </div>
        <div className="resource-card-header-expand" onClick={onClick}>
          <FontAwesomeIcon icon={["fas", "expand"]} />
        </div>
      </div>
      <div className="resource-card-desc">{resource.desc}</div>
      <div className="resource-card-footer">
        <div className="resource-card-footer-tags">
          {resource.tags.map((tag, index) => (
            <Tag
              className="resource-card-footer-tag"
              key={index}
              {...tag}
              onClick={() => onTagClick(tag.label)}
            />
          ))}
        </div>
        <div className="divider resource-card-footer-divider" />
        <div className="resource-card-footer-info">
          <div className="resource-card-footer-group">
            <Link href={resource.homepage}>
              {isGithub ? (
                <FontAwesomeIcon
                  className="resource-card-footer-icon"
                  icon={["fab", "github"]}
                />
              ) : (
                <FontAwesomeIcon
                  className="resource-card-footer-icon"
                  icon={["fas", "link"]}
                />
              )}
            </Link>
            {isPlugin && (
              <Link href={registryLink as string}>
                <FontAwesomeIcon
                  className="resource-card-footer-icon"
                  icon={["fas", "cube"]}
                />
              </Link>
            )}
          </div>
          <div className="resource-card-footer-group">
            <Avatar
              className="resource-card-footer-avatar"
              key={resource.author}
              authorAvatar={authorAvatar}
              authorLink={authorLink}
            />
            <span
              className="resource-card-footer-author"
              onClick={onAuthorClick}
            >
              {resource.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { TableCell, TableRow, Link } from '@mui/material';
import SaveIcon from "./saveIcon";

export function renderSection(section,showNewTabButton = true, showDownloadButton = true, hideThirdColumn = true) {
    return (
        <React.Fragment key={section.header}>
            <TableRow>
                <TableCell className="tableHeader" colSpan={3} style={{ color: 'white' }}>{section.header}</TableCell>
            </TableRow>
            {section.files.map((file, index) => (
                <TableRow key={index} className="tableRow">
                    <TableCell
                    sx={{
                        color: "var(--table-cell-text-color)",
                        fontFamily: "Trebuchet MS, Arial, sans-serif",
                        }}
                        className="tableCell">{file.description}</TableCell>
                    <TableCell className="tableCell">
                        <Link
                        sx={{
                            color: 'var(--link-color)',
                            textDecoration: 'none',
                            '&:hover': {
                              color: 'var(--link-hover-color)',
                            },
                          }}
                            href={file.url} target="_blank" rel="noopener noreferrer" className="link">{file.label}</Link>
                    </TableCell>
                    {hideThirdColumn && (
                        <TableCell className="tableCell">
                        <div className="linkContainer">
                            {showNewTabButton && (
                                <Link href={file.url} target="_blank" rel="noopener noreferrer" className="link">Відкрити у новій вкладці</Link>
                            )}
                            {showDownloadButton && (
                                <Link href={file.url} download className="link">
                                    <SaveIcon />
                                </Link>
                            )}
                        </div>
                    </TableCell>
                    )}
                </TableRow>
            ))}
        </React.Fragment>    
    );
}
/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { SpeakeasyBase, SpeakeasyMetadata } from "../../internal/utils";
import { Expose, Type } from "class-transformer";

export class File extends SpeakeasyBase {}

export class Dataset extends SpeakeasyBase {
    @SpeakeasyMetadata()
    @Expose({ name: "name" })
    name: string;

    @SpeakeasyMetadata()
    @Expose({ name: "purpose" })
    purpose: string;

    @SpeakeasyMetadata({ elemType: File })
    @Expose({ name: "file" })
    @Type(() => File)
    file: File[];

    @SpeakeasyMetadata()
    @Expose({ name: "bytes" })
    bytes: number;

    @SpeakeasyMetadata()
    @Expose({ name: "description" })
    description: string;

    @SpeakeasyMetadata()
    @Expose({ name: "task" })
    task: string;

    @SpeakeasyMetadata()
    @Expose({ name: "prompt" })
    prompt: string;

    @SpeakeasyMetadata()
    @Expose({ name: "id" })
    id?: string;
}
Options depending on the needs:
- "My app does not need to share files/storage with other pods or nodes" - use local storage. Fast, deleted when the pod is deleted
- "Multiple pods need to share the same data volumes, or reattach data volumes if the pod is rescheduled on a different node" - use Azure Storage, Azure Files, mount points, etc
Finally, you may need to inject sensitive data or application configuration information into pods.

![x](https://i.imgur.com/kcIqWQu.png)

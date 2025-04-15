export async function uploadImages(
  files: File[],
  access: string
): Promise<string[]> {
  const uploadedImageUrls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file) {
      uploadedImageUrls[i] = "";
      continue;
    }
    try {
      const res = await fetch(
        "https://api.interview.l-league.co.kr/api/v1/aws/upload",
        {
          method: "POST",
          body: JSON.stringify({file_name: file.name}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const {uploadURL, imageURL} = await res.json();

      const putRes = await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!putRes.ok) {
        uploadedImageUrls[i] = "";
        continue;
      }

      uploadedImageUrls[i] = imageURL;
    } catch (e) {
      uploadedImageUrls[i] = "";
    }
  }

  // console.log(uploadedImageUrls);
  return uploadedImageUrls;
}
